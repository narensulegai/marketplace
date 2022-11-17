import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactFormGenerator } from "react-form-builder2";
import {
  currentUser as getCurrentUser,
  getCompany,
  updateEmployee,
} from "../../util/fetch/api";
import { getMlQuote } from "../../util/mlFetch/mlApi";
import { formulaParser } from "../../util";

const Questioner = () => {
  const { id: companyId } = useParams();
  const [form, setForm] = useState([]);
  const [formula, setFormula] = useState(null);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [mlRuleEngine, setMlRuleEngine] = useState(false);
  const [mlJobCompletion, setMlJobCompletion] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    (async () => {
      const company = await getCompany(companyId);
      const { user } = await getCurrentUser();
      setCurrentUser(user);
      setForm(company.formData);
      setFormula(company.ruleFormula);
      if (user.variables && companyId in user.variables) {
        setVariables(user.variables[companyId]);
      }
      setMlRuleEngine(company.mlRuleEngine);
      setMlJobCompletion(company.mlJobCompletion);
      setLoading(false);
    })();
  }, [companyId]);

  const parseValue = (value) => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      const res = [];
      for (const row of form) {
        if (row.options) {
          for (const opt of row.options) {
            if (value.length > 0
                && (typeof value[0] === 'string'
                  ? value.includes(opt.key)
                  : value.map((v) => v.key).includes(opt.key))) {
              res.push(opt.value);
            }
          }
        }
      }
      return res.join(':');
    }
    if (typeof value === 'object' && value !== null) return value.value;
    return value;
  };
  
  const valuesToKeyValues = (variables) => {
    return variables.reduce((m, v) => {
      const val = parseValue(v.value);
      return { ...m, ...{ [v.name]: val } };
    }, {});
  };

  const getQuote = (formula, variables) => {
    const values = valuesToKeyValues(variables);
    const expr = formulaParser.parse(formula);
    return expr.evaluate(values);
  };

  const handleSubmitAnswers = async (variables) => {
    if (!("variables" in currentUser)) {
      currentUser.variables = {};
    }
    currentUser.variables[companyId] = variables;
    await updateEmployee(currentUser);
    setVariables(variables);

    if (mlRuleEngine && mlJobCompletion === "Completed") {
      const userInput = valuesToKeyValues(variables);
      console.log(userInput)
      const data = Object.values(userInput)
      console.log(data)
      const mlQuote = await getMlQuote({ id: companyId, data });
      setQuote(mlQuote.Quotation.toFixed(2));
    } else {
      const quote = getQuote(formula, variables);
      setQuote(quote);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <h2>Questioner</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactFormGenerator
            data={form}
            answer_data={variables}
            onSubmit={handleSubmitAnswers}
            submitButton={<button className="btn-danger">Get Quote</button>}
          />
        )}
        <div className="smallMarginTop">
          {quote && (
            <h5>
              Your quote is <b>${quote}</b>
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

Questioner.propTypes = {};

export default Questioner;
