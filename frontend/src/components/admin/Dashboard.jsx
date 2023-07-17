import { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../store/slices/productSlice.jsx";
import { getAllOrders } from "../../store/slices/allOrderSlice.jsx";

const Dashboard = () => {
  ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    ArcElement,
    Legend,
    Tooltip
  );

  const { products, error } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let OutOfStock = 0;
  products.forEach((pro) => {
    if (pro.stock <= 0) {
      OutOfStock += 1;
    }
  });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount ", "Final Amount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const lineOptions = {
    plugins: {
      legend: true,
    },
  };
  const DoughState = {
    labels: ["OutofStock", "InStock"],
    datasets: [
      {
        label: "STOCK",
        backgroundColor: ["tomato", "yellow"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [OutOfStock, products.length - OutOfStock],
      },
    ],
  };
  const DoughOptions = {
    plugins: {
      legend: true,
    },
  };
  return (
    <div className="flex sm:flex-col bg-white">
      <Sidebar className="w-1/3 sm:w-full " />
      <div className="w-2/3  sm:w-full  bg-white m-[5vmax] sm:mx-auto">
        <h1 className="text-gray-700 text-2xl font-bold text-center mb-8">
          Dashboard
        </h1>
        <div className="text-white font-bold bg-blue-700 p-[1vmax]">
          <p className="text-center">Total Revenue : ₹{totalAmount}</p>
        </div>
        <div className="flex justify-center items-center gap-12 my-8 sm:gap-4">
          <p className="w-40 sm:w-20 h-40 sm:h-20 rounded-full bg-orange-600 text-white font-semibold text-center flex items-center justify-center">
            Product: {products.length}
          </p>
          <p className="w-40 sm:w-20 h-40 sm:h-20 rounded-full bg-red-600 text-white font-semibold text-center flex items-center justify-center">
            Order: {orders && orders.length}
          </p>
          <p className="w-40 sm:w-20 h-40 sm:h-20 rounded-full bg-yellow-300 text-white font-semibold text-center flex items-center justify-center">
            Users: {users && users.length}
          </p>
        </div>
        <div className="my-16 w-4/5 mx-auto h-[60vh] sm:w-full ">
          <Line data={lineState} options={lineOptions} />
        </div>
        <div className="w-1/2  mx-auto">
          <Doughnut data={DoughState} options={DoughOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
