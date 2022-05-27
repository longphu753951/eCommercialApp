const rules = {
  required: { value: true, message: "This field is required" },
};

const nameRule = {
    required: { value: true, message: "This field is required" },
    pattern: {
      value: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
      message: "Please enter a valid name",
    },
}

const emailRule = {
  required: { value: true, message: "This field is required" },
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: "Please enter a valid email address",
  },
};

const telephoneRule = {
  required: { value: true, message: "This field is required" },
  pattern: {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: "Please enter a valid telephone number",
  },
};

const passwordRule = {
    required: { value: true, message: "This field is required" },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message: "Please enter a valid password",
    },
  };

export {telephoneRule, emailRule, nameRule, rules, passwordRule}