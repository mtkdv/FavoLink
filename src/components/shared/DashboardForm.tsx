import { useId } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

import { FormQueryKeys, queryKeys } from "#/const";
import { Schema as ProfileSchema } from "#/pages/my/profile";
import { Schema as AddVideoSchema } from "#/pages/my/add-video";

type Props = FormProps | ProfileProps | AddVideoProps;

type FormProps = {
  children: React.ReactNode;
  formKey: FormQueryKeys;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

type ProfileProps = {
  children: React.ReactNode;
  formKey: FormQueryKeys;
  onSubmit: SubmitHandler<ProfileSchema>;
  handleSubmit: UseFormHandleSubmit<ProfileSchema>;
};

type AddVideoProps = {
  children: React.ReactNode;
  formKey: FormQueryKeys;
  onSubmit: SubmitHandler<AddVideoSchema>;
  handleSubmit: UseFormHandleSubmit<AddVideoSchema>;
};

// type SubmitType<T> = T extends FormProps
//   ? FormProps
//   : T extends ProfileProps
//   ? ProfileProps
//   : AddVideoProps;

export const DashboardForm = (props: Props) => {
  const id = useId();

  const queryClient = useQueryClient();
  queryClient.setQueryData(queryKeys.form[props.formKey], id);

  const isReactHookForm = (
    props: Props
  ): props is ProfileProps | AddVideoProps => {
    return Object.hasOwn(props, "handleSubmit");
  };

  const isProfileForm = (
    props: ProfileProps | AddVideoProps
  ): props is ProfileProps => {
    return props.formKey === "profile";
  };

  return (
    <form
      id={id}
      onSubmit={
        isReactHookForm(props)
          ? isProfileForm(props)
            ? props.handleSubmit(props.onSubmit)
            : props.handleSubmit(props.onSubmit)
          : props.onSubmit
      }
    >
      {props.children}
    </form>
  );
};
