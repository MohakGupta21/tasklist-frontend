import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const useTaskStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  // Task State
  tasks: [],

  // Initialize store from cookies on page load
  initialize: () => {
    const token = Cookies.get("jwt_token");
    // if(token===undefined)
    //    Cookies.remove("jwt-token");
    if(token) {
      const decodedToken = jwtDecode(token);
      set({
        user: decodedToken.user_email,
        isLoggedIn: true,
        tasks: decodedToken.tasks || [],
      });
    }
  },

  // User Actions
  updateToken: (token) => {
    Cookies.set('jwt_token', token, { secure: true, sameSite: 'Strict' });
    const decodedToken = jwtDecode(token);
    set({
      user: decodedToken.user_email,
      isLoggedIn: true,
      tasks: decodedToken.tasks || [],
    });
  },

  logout: () => {
    Cookies.remove('jwt_token');
    set({
      user: null,
      isLoggedIn: false,
      tasks: [],
    });
  },

  // Task Actions
  // addTask: (token) =>{
  //   set((state) => ({
  //     tasks: [...state.tasks, newTask],
  //   }))
  // },

  // updateTask: (id, updatedTask) =>
  //   set((state) => ({
  //     tasks: state.tasks.map((task) =>
  //       task.id === id ? { ...task, ...updatedTask } : task
  //     ),
  //   })),

  // deleteTask: (id) =>
  //   set((state) => ({
  //     tasks: state.tasks.filter((task) => task.id !== id),
  //   })),
}));

export default useTaskStore;
