import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel minus, pariatur facilis mollitia voluptates aspernatur fuga atque consequuntur eveniet, ut quam asperiores quaerat laborum accusantium quae, recusandae ab dolor. Neque.
      </p>
      <p>Maurice Halsberghe</p>
      <a href='https://www.linkedin.com/in/maurice-halsberghe/' target='_blank' >LinkedIn</a>
    </div> 
  )
}
