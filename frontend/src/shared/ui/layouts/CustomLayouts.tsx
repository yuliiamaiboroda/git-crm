import React from 'react'

import { FormLayouts } from './form'
import { LoginLayouts } from './login'

interface ParentComposition {
  Form: typeof FormLayouts
  Login: typeof LoginLayouts
}

const CustomLayouts: React.FC & ParentComposition = () => {
  return <div>use children component</div>
}

CustomLayouts.Form = FormLayouts
CustomLayouts.Login = LoginLayouts

export { CustomLayouts }
