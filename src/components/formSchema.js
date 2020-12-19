import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required("name is required").min(2, "length"),
  size: yup.string().oneOf(["Small", "Medium", "Large"]),
  meat: yup.boolean(),
  veggies: yup.boolean(),
  pineapple: yup.boolean(),
  sauce: yup.boolean(),
  specialinstructions: yup.string(),
});
