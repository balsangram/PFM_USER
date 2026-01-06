function AddressCard({ address, isSelected, onSelect }) {
    return (
        <div
            onClick={onSelect}
            className={`border rounded-lg p-3 cursor-pointer transition ${isSelected
                ? "border-red-600 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
        >
            <h3 className="font-semibold text-sm">{address.name}</h3>
            <p className="text-xs text-gray-600">
                {address.street}, {address.city}
            </p>
            <p className="text-xs text-gray-600">
                {address.phone}
            </p>
        </div>
    );
}

export default AddressCard;
