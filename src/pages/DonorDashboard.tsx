
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const DonorDashboard = () => {
  const navigate = useNavigate();

  // Mock blood request data
  const bloodRequests = [
    {
      id: 1,
      hospital: "City General Hospital",
      bloodType: "O+",
      urgency: "Emergency",
      distance: "3.2 km",
      date: "2025-04-06"
    },
    {
      id: 2,
      hospital: "St. Mary's Medical Center",
      bloodType: "A-",
      urgency: "High",
      distance: "5.1 km",
      date: "2025-04-08"
    },
    {
      id: 3,
      hospital: "Community Blood Bank",
      bloodType: "All Types",
      urgency: "Normal",
      distance: "2.7 km",
      date: "2025-04-10"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-500 hover:bg-red-600";
      case "High":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  const handleDonateClick = (requestId: number) => {
    // Navigate to donation form for specific request
    navigate(`/donate?requestId=${requestId}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Last Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">March 12, 2025</p>
            <p className="text-muted-foreground">85 days ago</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blood Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">O+</p>
            <p className="text-muted-foreground">Universal Donor</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-muted-foreground">Total Lifetime</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Blood Requests Near You</h2>
      <div className="space-y-4">
        {bloodRequests.map((request) => (
          <Card key={request.id} className={request.urgency === "Emergency" ? "border-red-500 border-2" : ""}>
            <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{request.hospital}</h3>
                  {request.urgency === "Emergency" && (
                    <Badge variant="destructive">EMERGENCY</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-2">
                  {request.distance} away • Needed by {request.date}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-lg px-3">
                    {request.bloodType}
                  </Badge>
                </div>
              </div>
              <Button 
                className={getUrgencyColor(request.urgency)}
                onClick={() => handleDonateClick(request.id)}
              >
                Donate Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DonorDashboard;
