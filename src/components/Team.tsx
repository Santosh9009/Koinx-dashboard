"use client"
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import image1 from '../../public/Image_1.png'
import image2 from '../../public/image_2.png'
import image3 from '../../public/image_3.png'

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      designation: "Designation here",
      image: "/Image_1.png",
      description: "Lorem ipsum dolor sit amet consectetur..."
    },
    {
      id: 2,
      name: "Elina Williams",
      designation: "Designation here",
      image: "/image_2.png",
      description: "Lorem ipsum dolor sit amet consectetur..."
    },
    {
      id: 3,
      name: "Michael Brown",
      designation: "Designation here",
      image: "/Image_3.png",
      description: "Lorem ipsum dolor sit amet consectetur..."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-white rounded-md mt-4">
      <h2 className="text-xl font-bold mb-3">Team</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh...
      </p>
      
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-base font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.designation}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {member.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
