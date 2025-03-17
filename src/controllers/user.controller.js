import User from "../models/user.model.js";

export const getAllUsersByRole = async (req, res) => {
    try {
      // Force filter: return only users with role "user"
      const users = await User.find({ role: "user" }).select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Only allow deletion for non-admin (employee) users
      if (user.role !== "user") {
        return res.status(403).json({ message: "Not authorized to delete this user" });
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };