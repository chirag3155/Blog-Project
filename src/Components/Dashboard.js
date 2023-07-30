import React, { useState } from 'react';
// import './Dashboard.css';
import SignUpForm from './SignUp';
import SignInForm from './SignInForm';
import './dashboard.css'
const Post = ({ post, onLike, onDislike, onDelete, onEdit,user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(post.id, editedContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="username">{user}</span>
        <span className="icons" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </span>
        <span className="icons" onClick={() => onDelete(post.id)}>
          Delete
        </span>
      </div>
      <div className="post-content">
        {isEditing ? (
          <textarea
            className="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          post.content
        )}
      </div>
      <div className="post-footer">
        <button className="btn btn-primary" onClick={() => onLike(post.id)}>Like {post.likes}</button>
        <button className="btn btn-primary" onClick={() => onDislike(post.id)}>Dislike {post.dislikes}</button>
      </div>
    </div>
  );
};

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="post-form">
      <div >
        <textarea
          className="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your post here..."
        />
        <button className="btn btn-primary" onClick={handleSubmit}>Share</button>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const handlePostSubmit = (content) => {
    const newPost = {
      id: Date.now(),
      content,
      likes: 0,
      dislikes: 0,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    displayAlert('Post created successfully.');
  };

  const handlePostLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handlePostDislike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    displayAlert('Post deleted successfully.');
  };

  const handlePostEdit = (postId, editedContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: editedContent } : post
      )
    );
    displayAlert('Post edited successfully.');
  };

  const displayAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };
  const handleSignUp = (formData) => {
    // ... Perform Sign Up logic ...
    setTab("dashboard");
    setUser({ name: formData.name, email: formData.email });
    setAlertMessage('Sign Up successful.');
  };

  const handleSignIn = (formData) => {
    // ... Perform Sign In logic ...
    setTab("dashboard");
    setUser({ email: formData.email });
    setAlertMessage('Sign In successful.');
  };

  // // const handleAlertClose = () => {
  //   setAlertMessage('');
  // };

  return (
    <div>
      <div>
        <nav className='ls'>
          
              <div onClick={() => { setTab("dashboard") }}>Dashboard</div>
           
              <div onClick={() => { setTab("signin") }}>Sign In</div>
           
              <div onClick={() => {setTab("signup" ) }}>Sign Up</div>
           
        </nav>
      </div>
<div className='post'>
{tab === "dashboard" ?
        <div>
          {alertMessage && <div className="alert">{alertMessage}</div>}
          {user ?
            <div>
              <h2>Welcome, {user.name || user.email}!</h2>
              <PostForm onSubmit={handlePostSubmit} />
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handlePostLike}
                  onDislike={handlePostDislike}
                  onDelete={handlePostDelete}
                  onEdit={handlePostEdit}
                  user={user?.name || "Random User"}
                />
              ))}
            </div> :
            <div>
              <h2>Welcome, Random User!</h2>
              <PostForm onSubmit={handlePostSubmit} />
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handlePostLike}
                  onDislike={handlePostDislike}
                  onDelete={handlePostDelete}
                  onEdit={handlePostEdit}
                  user={user?.name || "Random User"}
                />
              ))}
            </div>
          }

        </div>
        : null
      }


      {tab === "signin" ? <SignInForm onSignIn={handleSignIn} /> : null}
      {tab === "signup" ? <SignUpForm onSignUp={handleSignUp} /> : null}


      </div>
    </div>
  );
};



export default Dashboard;
