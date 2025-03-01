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

function parseProperty(prop: any): Property {
  prop = prop.split('\n')
  prop = removeEmptyStrings(prop)
  const key = toPropertyName(prop[0])

  let propVal: string | number | boolean
  if (isCheckbox(prop[1])) {
    propVal = parseCheckbox(prop[1])
  } else if (isNumber(prop[1])) {
    propVal = Number.parseInt(prop[1])
  } else {
    propVal = prop[1]
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
