import { useEffect } from "react";

const Dashboard = () => {
  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard</h1>
      <p className="text-red-600 text-3xl font-bold leading-snug">
        Tháng sau làm tiếp! That is 1 minute coding for today. See you in next
        month
      </p>
    </main>
  );
};

export default Dashboard;
