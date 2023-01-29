import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { IFormState, IInputHoverState } from '@/types/contact';
import { sendContactForm } from '@/components/contact/util';
import { ContactForm } from '@/components/contact/contact_form/ContactForm';
import * as S from './style';

export function Contact() {
  const toast = useToast();
  const initalState = {
    isLoading: false,
    error: '',
    values: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  };
  const initialHoverState = {
    name: false,
    email: false,
    subject: false,
    message: false,
  };
  const [formState, setFormState] = useState<IFormState>(initalState);
  const [isBlured, setIsBlured] = useState<IInputHoverState>(initialHoverState);

  const checkAllFieldIsValid = () =>
    Object.values(formState.values).every(value => value);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev: IFormState) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setIsBlured((prev: IInputHoverState) => ({
      ...prev,
      [name]: true,
    }));
  };

  const onSubmit = async () => {
    if (!checkAllFieldIsValid()) {
      toast({
        title: 'Please fill in all required fields.',
        status: 'warning',
        duration: 2000,
        position: 'top',
      });

      return;
    }

    setFormState((prev: IFormState) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      setFormState(initalState);
      setIsBlured(initialHoverState);
      toast({
        title: 'Email sent successfully 🎉',
        status: 'success',
        duration: 2000,
        position: 'top',
      });

      await sendContactForm({
        data: formState.values,
      });
    } catch (e: unknown) {
      const { message } = e as Error;
      setFormState((prev: IFormState) => ({
        ...prev,
        error: message,
      }));
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <h1>Contact Me!</h1>
        <p>
          {`I'm open to new opportunities. If you have any questions, don't
          hesitate to reach out`}
        </p>
      </S.Wrapper>
      <ContactForm
        formState={formState}
        isBlured={isBlured}
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
      />
    </S.Container>
  );
}
