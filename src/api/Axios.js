import Axios from "axios";
import { BASE_URL } from "../contants/Config";

export default Axios.create({
  baseURL: BASE_URL,
});
