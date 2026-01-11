export default function StaffCard({ staff }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Staff Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={staff.image}
          alt={staff.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{staff.name}</h3>
          <p className="text-yellow-400 font-semibold">{staff.role}</p>
        </div>
      </div>

      {/* Staff Info */}
      <div className="p-6">
        <div className="mb-4">
          <div className="inline-block px-3 py-1 bg-black dark:bg-yellow-400 text-white dark:text-black text-sm font-semibold rounded-full">
            {staff.specialty}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {staff.bio}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>Age: {staff.age}</span>
          <span>•</span>
          <span>{staff.gender}</span>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-black dark:text-yellow-400">
              Fun Fact:
            </span>{' '}
            {staff.funFact}
          </p>
        </div>
      </div>
    </div>
  );
}
