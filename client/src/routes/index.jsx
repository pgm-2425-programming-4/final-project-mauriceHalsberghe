import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <p>
        Welcome to my Kanban app! Please select an item from the navigation menu.
      </p>
    </div> 
  )
}
