interface Property {
  key: string
  value: string | number | boolean
}

type PropertyMap = { [key: string]: string | number | boolean }

function removeEmptyStrings(array: string[]): string[] {
  return array.filter((value: string) => value)
}

function toPropertyName(property: string): string {
  property = property.toLowerCase()
  property = property.replaceAll(' ', '_')
  return property
}

function isCheckbox(value: string): boolean {
  return /^- \[( |x)\].*$/.test(value)
}

function parseCheckbox(checkbox: string): boolean {
  return checkbox[3] != ' '
}

function isNumber(value: string) {
  return /^-?\d+$/.test(value)
}

function parseProperty(prop: string): Property {
  let props = prop.split('\n')
  props = removeEmptyStrings(props)
  const key = toPropertyName(props[0])

  let propVal: string | number | boolean
  if (isCheckbox(props[1])) {
    propVal = parseCheckbox(props[1])
  } else if (isNumber(props[1])) {
    propVal = Number.parseInt(props[1])
  } else {
    propVal = props[1]
  }

  return {
    key: key,
    value: propVal
  }
}

export function parseIssue(issueBody: string) {
  let properties = issueBody.split('### ')
  properties = removeEmptyStrings(properties)

  const propArr = properties.map((prop) => parseProperty(prop))
  return propArr.reduce<PropertyMap>((acc, current) => {
    acc[current.key] = current.value
    return acc
  }, {})
}
