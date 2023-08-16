import * as AuthActions from "./auth";
import * as DriveActions from "./drive";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthActions,
  ...DriveActions,
};
