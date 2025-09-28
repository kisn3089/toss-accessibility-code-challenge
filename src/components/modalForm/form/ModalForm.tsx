import Button from "../../atom/button/Button";
import BaseModal from "../../modal/baseModal/BaseModal";
import FormFooter from "../footer/FormFooter";
import { WithLabel } from "../withLabel/WithLabel";
import { Input, Select } from "../withLabel/WithLabel.style";
import { FormLayout } from "./ModalForm.style";
import React from "react";

export const ModalForm = () => {
  return (
    <BaseModal
      title="신청 폼"
      announce="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.">
      <Form>
        <FormFooter>
          <Button type="button" mode="secondary">
            {"취소"}
          </Button>
          <Button type="submit" mode="primary">
            {"제출하기"}
          </Button>
        </FormFooter>
      </Form>
    </BaseModal>
  );
};

type Experience = "junior" | "mid" | "senior" | "";
interface FormData {
  name: string;
  email: string;
  experience: Experience;
  github?: string;
}

const Form = ({ children }: React.PropsWithChildren) => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const githubRef = React.useRef<HTMLInputElement>(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      experience: experienceRef.current?.value as Experience,
      github: githubRef.current?.value || "",
    };

    console.log(formData);
  };

  return (
    <FormLayout onSubmit={submitForm}>
      <WithLabel label="이름 / 닉네임">
        {(label) => <Input ref={nameRef} id={label} type="text" required />}
      </WithLabel>
      <WithLabel label="이메일">
        {(label) => <Input ref={emailRef} id={label} type="email" required />}
      </WithLabel>
      <WithLabel label="FE 경력 연차">
        {(label) => (
          <Select
            ref={experienceRef}
            id={label}
            aria-label="FE 경력 연차"
            required>
            <option value="">선택하세요</option>
            <option value="junior">{"0-3년차"}</option>
            <option value="mid">{"4-7년차"}</option>
            <option value="senior">{"8년차 이상"}</option>
          </Select>
        )}
      </WithLabel>
      <WithLabel label="GitHub 링크 (선택)">
        {(label) => <Input ref={githubRef} id={label} type="text" />}
      </WithLabel>
      {children}
    </FormLayout>
  );
};
