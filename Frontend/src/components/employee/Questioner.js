import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFormGenerator } from 'react-form-builder2';
import {
  currentUser as getCurrentUser,
  getCompany,
  updateEmployee,
} from '../../util/fetch/api';
import { getMlQuote } from '../../util/mlFetch/mlApi';
import { formulaParser } from '../../util';

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
      if (companyId in user.variables) {
        setVariables(user.variables[companyId]);
      }
      // setVariables(company.variables);
      setMlRuleEngine(company.mlRuleEngine);
      setMlJobCompletion(company.mlJobCompletion);
      setLoading(false);
    })();
  }, [companyId]);

  const getQuote = (formula, variables) => {
    const values = variables.reduce((m, v) => {
      return { ...m, ...{ [v.name]: v.value } };
    }, {});
    const expr = formulaParser.parse(formula);
    return expr.evaluate(values);
  };

  const handleSubmitAnswers = async (variables) => {
    if (!('variables' in currentUser)) {
      currentUser.variables = {};
    }
    currentUser.variables[companyId] = variables;
    await updateEmployee(currentUser);
    setVariables(variables);
    let data= [];
    if(mlRuleEngine && mlJobCompletion === 'Completed'){
      console.log("here")
      variables.forEach(variable => {
        data.push(variable['value']);
      })
      const mlQuote = await getMlQuote({'id' : companyId, 'data': data});
      console.log(mlQuote['Quotation']);
      setQuote(mlQuote['Quotation'].toFixed(2));
    }else{
      const quote = getQuote(formula, variables);
      setQuote(quote);
    }
    
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <h2>Questioner</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactFormGenerator
            data={form}
            answer_data={variables}
            onSubmit={handleSubmitAnswers}
            submitButton={<button className='btn-danger'>Get Quote</button>}
          />
        )}
        <div className='smallMarginTop'>
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
