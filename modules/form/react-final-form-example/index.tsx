import * as React from 'react';
// libs
import { Form } from 'react-final-form';
// hooks
import { useValidationSchema } from '@md-shared/hooks/use-validatetion-scheme';
// constants
import { OPTIONS, BUTTON_STYLE, FormData, DEFAULT_VALUES } from '@md-modules/form/constants';
// components
import { Button } from '@md-ui/button';
import { FinalFormSelect, FinalFormInput } from '@md-shared/components/form';
// validation
import { schema } from '@md-modules/form/validation';
// views
import { ContentWrapper } from '@md-shared/views/common';
import { FormWrapper, ButtonWrapper } from '@md-modules/form/views';

const ReactFinalFormExample = () => {
  const validate = useValidationSchema(schema);

  const onSubmit = (data: FormData) => window.alert(JSON.stringify(data));

  return (
    <ContentWrapper>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={DEFAULT_VALUES}
        render={({ handleSubmit }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FinalFormInput label='Name' name='name' placeholder='Enter name...' />
            <FinalFormInput label='Email' name='email' />
            <FinalFormInput label='Phone number' name='phoneNumber' />
            <FinalFormSelect label='Fruit' name='fruit' options={OPTIONS} />
            <FinalFormSelect isMulti label='Fruits' name='fruits' options={OPTIONS} />

            <ButtonWrapper>
              <Button type='submit' buttonStyle={BUTTON_STYLE}>
                Submit Form
              </Button>
            </ButtonWrapper>
          </FormWrapper>
        )}
      />
    </ContentWrapper>
  );
};

export { ReactFinalFormExample };
