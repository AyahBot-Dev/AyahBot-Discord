import axios from "axios";

export default axios.create({
  validateStatus: /* istanbul ignore next */ () => true,
});
