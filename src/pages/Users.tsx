import type React from "react"
import { UsersTable } from "../components/users-table"

const Users: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion Client</h1>
        <p className="text-muted-foreground">
          Gérer les comptes clients, consulter l'activité des utilisateurs et gérer le statut des comptes.
        </p>
      </div>
      <UsersTable />
    </>
  )
}

export default Users
