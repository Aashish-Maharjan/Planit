export function getInitials(fullName) {
    if (!fullName || typeof fullName !== "string") {
      return ""; // Return an empty string if fullName is invalid
    }
  
    // Split the name, trim spaces, and remove any empty strings
    const names = fullName.trim().split(" ").filter(Boolean);
  
    // Get the initials from the first two valid names
    const initials = names.slice(0, 2).map((name) => name[0]?.toUpperCase() || "");
  
    return initials.join("");
  }
  