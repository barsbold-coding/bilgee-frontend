import { Space } from "./space";
import { Email } from "./icon/email";
import { Location } from "./icon/location";

export function Footer() {
  return (
    <div className="px-12 py-12">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">iNTERNSHIP.mn</h1>
          <Space size={24} />
          <p className="text-gray-500">Холбоо барих</p>
          <div className="flex flex-row">
          </div>
        </div>
        <div>
          <div className="text-xs flex">
            <Email size={12} />
            <Space direction="horizontal" />
            internshipmn@gmail.com
          </div>
          <Space direction="vertical" />
          <div className="text-xs flex">
            <Location size={12} />
            <Space direction="horizontal" />
            Монгол улс, Улаанбаатар хот
          </div>
        </div>
      </div>
      <Space size={24} />
      <div className="h-[2px] bg-gray-300 w-full"></div>
      <p className="text-gray-300">Developed by Erdenebileg ❤️</p>
    </div>
  );
}
