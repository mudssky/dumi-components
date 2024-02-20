# Calendar

This is an example component.

```jsx
import { MiniCalendar } from '@mudssky/react-components'

export default () => <MiniCalendar value={new Date('2024-2-20')}
onChange={(date:Date)=>{console.log({date})}}
/>
```
