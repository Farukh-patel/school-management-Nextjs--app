export default function SchoolCard({ school }) {
  return (
    <div className="border m-10 rounded-xl shadow p-4 bg-white">
      <img
        src={`/schoolImages/${school.image}`}
        alt={school.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{school.name}</h3>
      <p className="text-gray-600 bg-green-900">{school.address}</p>
      <p className="text-gray-500">{school.city}</p>
    </div>
  );
}
