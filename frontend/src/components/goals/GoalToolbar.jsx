import { useGoal } from "../../context/GoalContext";

export default function GoalToolbar() {

    const {

        search,
        setSearch,

        priorityFilter,
        setPriorityFilter,

        statusFilter,
        setStatusFilter,

    } = useGoal();

    return (

        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-wrap gap-4">

            <input

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                placeholder="Search Goals"

                className="border rounded-xl px-4 py-3 flex-1"

            />

            <select

                value={priorityFilter}

                onChange={(e)=>setPriorityFilter(e.target.value)}

                className="border rounded-xl px-4 py-3"

            >

                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>

            </select>

            <select

                value={statusFilter}

                onChange={(e)=>setStatusFilter(e.target.value)}

                className="border rounded-xl px-4 py-3"

            >

                <option>All</option>
                <option>Active</option>
                <option>Completed</option>

            </select>

        </div>

    );

}