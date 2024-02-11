import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import CheckAdminToken from "../services/CheckAdminToken";

import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import SmallLoading from "../components/SmallLoading";
import { Toaster } from "sonner";
import UsersListTile from "./UsersListTile";

const UsersControl = () => {

    CheckAdminToken();

    const [users, setUsers] = useState();
    const [isUsersLoading, setIsUsersLoading] = useState(true);

    useEffect(() => {

        const usersUrl = BASE_API_URL + "user/getAll";

        axios.get(usersUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
                setIsUsersLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div className="usersList">
                    <h2>Users Control</h2>
                    <div>
                        <h3>Active Users</h3>
                        {isUsersLoading &&
                            <SmallLoading />
                        }
                        {!isUsersLoading &&
                            <div>
                                {(users.length == 0) ? <div>
                                    <p>No Users</p>
                                </div>:
                                users
                            .filter(users => users.status === 'ACTIVE')
                            .map((user) => (
                                <UsersListTile key={user.id} user={user} />
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>Deactive Users</h3>
                        {isUsersLoading &&
                            <SmallLoading />
                        }
                        {!isUsersLoading &&
                            <div>
                                {(users.length == 0) ? <div>
                                    <p>No Users</p>
                                </div>:
                                users
                            .filter(users => users.status === 'DEACTIVE')
                            .map((user) => (
                                <UsersListTile key={user.id} user={user} />
                                ))}
                            </div>
                        }
                    </div>
                </div>
                </div>
            </div>
            );
}

            export default UsersControl;