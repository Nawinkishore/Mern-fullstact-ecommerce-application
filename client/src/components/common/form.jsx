import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Button } from '../ui/button'

const types = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select'
}

function createElements(getControlItem, formData, setFormData) {
  let element = null;
  let value = formData[getControlItem.name] || '';
  switch (getControlItem.componentType) {
    case types.INPUT:
      element = <Input
        value={value}
        name={getControlItem.name}
        type={getControlItem.type}
        placeholder={getControlItem.placeholder}
        id={getControlItem.name}
        onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
      />
      break;

    case types.TEXTAREA:
      element = <Textarea
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.id}
        value={value}
        onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
      />
      break;

    case types.SELECT:
      element = <Select onValueChange={(value) => setFormData({
        ...formData,
        [getControlItem.name]: value
      })} value={value}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={getControlItem.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {
            getControlItem.options &&
              getControlItem.options.length > 0 ?
              getControlItem.options.map((optionItem) => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
          }
        </SelectContent>
      </Select>
      break;

    default:
      element = <Input
        name={getControlItem.name}
        type={getControlItem.type}
        placeholder={getControlItem.placeholder}
        id={getControlItem.name}
        value={value}
      />
      break;
  }
  return element;
}

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText ,isBtnDisabled}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className='grid w-full gap-1.5'>
            <Label className={'mb-1'}>{controlItem.label}</Label>
            {
              createElements(controlItem, formData, setFormData)
            }
          </div>
        ))}
        <Button
        disabled={isBtnDisabled}
        type='submit'
          className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
      </div>
    </form>
  )
}

export default CommonForm