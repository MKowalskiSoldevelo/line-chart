import { combineReducers } from '@reduxjs/toolkit';
import companies from './companies';

const rootReducer = {
  companies,
}

export default combineReducers(rootReducer);