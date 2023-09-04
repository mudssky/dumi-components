import React, { type FC } from 'react'

const Foo: FC<{ title: string }> = (props: any) => <h4>{props.title}</h4>

export default Foo
