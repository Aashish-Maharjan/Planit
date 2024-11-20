import React from 'react'

const Title = ({title,className}) => {
  return (
    <h2 className={clsx('text-2xl font-semibold capitalizer',className)}>
      {title}
    </h2>
  )
}

export default Title
