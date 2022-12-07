import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  SearchHeader,
  StyledForm,
  Input,
  Button,
  Icon,
} from './Searchbar.styled';

const initialValues = { query: '' };

const schema = yup.object().shape({
  query: yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    onSubmit(query);
    resetForm();
  };
  return (
    <SearchHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <Button type="submit">
            <Icon />
          </Button>
          <Input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </Formik>
    </SearchHeader>
  );
};
