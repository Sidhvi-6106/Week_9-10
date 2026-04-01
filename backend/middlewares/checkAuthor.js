import { userTypeModel } from "../models/UserModel.js";

export const checkAuthor = async (req, res, next) => {
  //get author id
  let aid = req.body?.author || req.params?.authorId;
  //verify author
  let author = await userTypeModel.findById(aid);
  //if author not found
  if (!author ) {
    return res.status(401).json({ message: "Invalid Author" });
  }
  //if author found but role is different
  if(author.role!=='AUTHOR'){
    return res.status(403).json({ message: "User is not an Author" });
  }
  //if author blocked
  if(!author.isActive){
     return res.status(403).json({ message: "Author account is not active" });
  }
  //forward req to next
  next();
};
// restore login
checkAuthor: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  }