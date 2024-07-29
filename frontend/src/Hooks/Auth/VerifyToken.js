import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserValue } from "../../Context/UserContext";
import { apiGET } from "../../APIHelper";
const verify = async () => {
  const response = await apiGET("/auth/verifyToken");
  if (!response) {
    throw Error("Something Went Wrong");
  }
  if (response.status !== 200) {
    throw Error(response.data.message);
  }
  return response;
};
const VerifyToken = () => {
  const { user, setUser } = useContext(UserValue);
  return useMutation({
    mutationFn: verify,
    onSuccess: (response) => {
      setUser({ ...response.data.data });
    },
    onError: (error) => {
      localStorage.removeItem("access_token");
      window.location.reload(false);
    },
  });
};
export default VerifyToken;
