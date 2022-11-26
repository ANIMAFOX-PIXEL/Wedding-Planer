import { axios } from '../api/axios'
import { getToken } from "../utils/persistToken";
import { Me } from "./Me";

export const PlannerFindOrCreate = async (date = undefined, productIds = undefined) => {
  const { err: meErr } = await Me();
  if (meErr) {
    console.error(meErr);
    return {err:meErr};
  }

  const config = {
    headers: {
        'Authorization': `Bearer ${getToken()}`,
    },
  };
  const { err: createPlannerErr, data } = 
    await axios.post('/planner-create', { date, productIds }, config);

  if (createPlannerErr){
    console.error(createPlannerErr);
    return {err: createPlannerErr};
  }

  return { data };
};
