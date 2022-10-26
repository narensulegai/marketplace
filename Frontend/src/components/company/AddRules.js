import React, { createRef, useEffect, useState } from 'react';
import { Parser } from 'expr-eval';
import * as formulajs from '@formulajs/formulajs';
import { currentUser, updateCompany } from '../../util/fetch/api';

const parser = new Parser();
Object.assign(parser.functions, formulajs);

const AddRules = () => {
  const expr = parser.parse("DAYS('3/15/11', '2/1/11')");
  console.log(expr.evaluate({ x: 3 })); // 7
  const [variables, setVariables] = useState([]);
  const [formula, setFormula] = useState(null);
  useEffect(() => {
    (async () => {
      const current = await currentUser();
      const form = JSON.parse(current.user.formData);
      setFormula(current.user.ruleFormula);
      setVariables(form.map((f) => f.field_name));
    })();
  }, []);

  const handleOnSave = async () => {
    await updateCompany({ ruleFormula: formula });
  };
  const handleOnFormulaChange = (e) => {
    setFormula(e.target.value);
  };
  return (
    <div className="row">
      <div className="col-12">
        <h4>Add rules</h4>
      </div>
      <div className="col-7">
        <div className="inputLabel">Excel formula</div>
        <div>
          <textarea cols={60} type="text" value={formula} onChange={handleOnFormulaChange}
            placeholder="IF(age>18, 100*num_of_cars, 1500)" />
        </div>
        <div className="mt-4">
          <button className="btn-primary" onClick={handleOnSave}>Save</button>
        </div>
      </div>
      <div className="col-5">
        <div className="card">
          <div className="card-header">Available variables</div>
          <div className="card-body">
            {variables.map((v, i) => {
              return (
                <div key={i}>
                  <div className="badge badge-pill badge-secondary">{v}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

AddRules.propTypes = {};

export default AddRules;
