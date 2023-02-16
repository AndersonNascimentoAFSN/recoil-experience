import { Suspense } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

interface User {
  id: number;
  name: string;
  phone: string;
  username: string;
}

const usersState = selector({
  key: "users",
  get: async () => {
    const userData = await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[] | undefined) => data);

    return userData;
  },
});

const userIdState = atom<number | undefined>({
  key: "userId",
  default: undefined,
});

const userState = selector({
  key: "user",
  get: async ({ get }) => {
    const userId = get(userIdState);

    if (userId === undefined) return;

    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    )
      .then((res) => res.json())
      .then((data: User | undefined) => data);

    return userData;
  },
});

export function ViewProfile() {
  return (
    <div>
      <h1>View Profile</h1>

      <h2>Choose a user:</h2>

      <Suspense
        fallback={
          <div>
            <span>Loading...</span>
          </div>
        }
      >
        <SelectViewProfile />
      </Suspense>

      <h2>User Data:</h2>
      
      <Suspense
        fallback={
          <div>
            <span>Loading...</span>
          </div>
        }
      >
        <UserData />
      </Suspense>
    </div>
  );
}

export function SelectViewProfile() {
  const [userId, setUserId] = useRecoilState(userIdState);

  const users = useRecoilValue(usersState);

  function handleChangeUserId(event: any) {
    const userIdValue = event?.target.value
      ? parseInt(event.target.value)
      : undefined;
    setUserId(userIdValue);
  }

  return (
    <select
      name="user"
      id="user"
      placeholder="Choose a user"
      onChange={handleChangeUserId}
      value={userId}
      style={{ padding: "5px 10px", width: "300px" }}
    >
      <option></option>
      {users?.map((user) => (
        <option key={user?.id} value={user?.id}>
          {user?.username}
        </option>
      ))}
    </select>
  );
}

export function UserData() {
  const user = useRecoilValue(userState);

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <span>Loading...</span>
          </div>
        }
      >
        <p>
          <strong>Name: {user?.name}</strong>
        </p>

        <p>
          <strong>Phone: {user?.phone}</strong>
        </p>
      </Suspense>
    </div>
  );
}
