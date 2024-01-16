import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const dataList = [
  { name: 'John Doe', email: 'john.doe@example.com', avatar: "avatar-1.avif" },
  { name: 'Jane Smith', email: 'jane.smith@example.com', avatar: "avatar-2.avif" },
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', avatar: "avatar-3.avif" },
  { name: 'Bob Williams', email: 'bob.williams@example.com', avatar: "avatar-4.avif" },
  { name: 'Eva Brown', email: 'eva.brown@example.com', avatar: "avatar-5.avif" },
  { name: 'Michael Davis', email: 'michael.davis@example.com', avatar: "avatar-6.avif" },
  { name: 'Olivia Taylor', email: 'olivia.taylor@example.com', avatar: "avatar-7.avif" },
  { name: 'Daniel Clark', email: 'daniel.clark@example.com', avatar: "avatar-8.avif" },
  { name: 'Sophia Lee', email: 'sophia.lee@example.com', avatar: "avatar-9.avif" },
  { name: 'William Turner', email: 'william.turner@example.com', avatar: "avatar-10.avif" }]


function App() {

  const [isShowUsers, setIsShowUsers] = useState(false);
  const [users, setUsers] = useState(dataList);
  const [filteringList, setFilteringList] = useState(dataList)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isBlue, setisBlue] = useState(false)


  const onBackspaceClicked = (event) => {
    if (event.target.value === "" && event.key.toLowerCase().includes("backspace")) {
      if (!isBlue)
        setisBlue(true)
      else {
        const poppedUser = selectedUsers.pop();
        setSelectedUsers([...selectedUsers]);
        users.unshift(poppedUser);
        setUsers([...users])
        setisBlue(false)
      }
    }
  }

  const searchUser = event => {
    console.log(event.target.value)
    const newList = filteringList?.filter((li) => li.name.toLowerCase().startsWith(event.target.value));
    setUsers([...newList])
  }
  const removeUser = selectedUser => {
    const newSelectedUser = selectedUsers.filter((sli) => sli.name !== selectedUser.name);
    users.unshift(selectedUser);
    setUsers([...users]);
    setSelectedUsers([...newSelectedUser])
    setFilteringList([...users])
  }

  const addUser = (user, index) => {
    selectedUsers.push(user);
    setSelectedUsers([...selectedUsers]);
    const newList = filteringList.filter((li) => li.name !== user.name);
    if (newList.length === 0)
      setIsShowUsers(false)
    setUsers([...newList])
    setFilteringList([...newList])
  }


  return (
    <div className="application">
      {
        selectedUsers.map((selectedUser, index) => {
          return <div className={`application__chip ${isBlue && index === selectedUsers.length - 1 ? `application__chip--blue` : ""}`}>
            <img src={`./${selectedUser.avatar}`} className='avatar' />
            <p>{selectedUser.name}</p>
            <CloseIcon className="cancel-button" onClick={() => removeUser(selectedUser)} />
          </div>
        })
      }
      <div className='input-container'>
        <input
          className='search-box'
          onFocus={() => users.length > 0 && setIsShowUsers(true)}
          placeholder="Add a new User"
          onChange={(event) => searchUser(event)}
          onKeyDown={(event) => onBackspaceClicked(event)} />
        {
          isShowUsers && (
            <div className='list-container'>
              {users.map((user, index) => {
                return (
                  <div
                    className={`list-container__item`}
                    key={user.name}
                    onClick={() => addUser(user, index)}>
                    <img src={`./${user.avatar}`} className='avatar' />
                    <p className='name'>{user.name}</p>
                    <p className='email'>{user.email}</p>
                  </div>
                )
              })}
            </div>
          )
        }
      </div>
    </div >
  );
}

export default App;
