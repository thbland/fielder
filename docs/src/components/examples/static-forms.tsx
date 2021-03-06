import React from 'react';
import * as fielderImports from 'fielder';
import { Editor } from '../Editor';

const code = `\
import { useForm, useField, useSubmit, FielderProvider } from "fielder";

const Form = () => {
  const form = useForm();

  return (
    <FielderProvider value={form}>
      <FormContent />
    </FielderProvider>
  );
};

const FormContent = () => {
  const [usernameProps, usernameMeta] = useField({
    name: "username",
    initialValue: "",
    validate: usernameValidation,
  });
  const [passwordProps, passwordMeta] = useField({
    name: "password",
    initialValue: "",
    validate: passwordValidation,
  });

  const { handleSubmit } = useSubmit((values) =>
    alert(\`Submitted: \${JSON.stringify(values, null, 2)}\`)
  );

  return (
    <form autoComplete="off">
      <div className="field">
        <label>Username</label>
        <input type="text" {...usernameProps} />
        {conditionalError(usernameMeta)}
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" {...passwordProps} />
        {conditionalError(passwordMeta)}
      </div>

      <button type="button" onClick={handleSubmit} className="primary">
        Submit
      </button>
    </form>
  );
};

const usernameValidation = ({ value }) => {
  if (!value) {
    throw Error("Username is required.");
  }

  if (value.length < 4) {
    throw Error("Username must be at least 4 characters.");
  }
};

const passwordValidation = ({ value }) => {
  if (!value) {
    throw Error("Password is required.");
  }

  if (value.length < 4) {
    throw Error("Password must be at least 4 characters.");
  }
};

const conditionalError = (meta) =>
  meta.hasBlurred && meta.error && <p>{meta.error}</p>;

// Render this live example
render(<Form />);

`;

const scope = {
  ...fielderImports,
};

export const Example = () => <Editor code={code} scope={scope} />;
