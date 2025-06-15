import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <section className="main">
      <p>
        Welcome to my Kanban app! Please select an item from the navigation menu.
      </p>
    </section> 
  )
}
