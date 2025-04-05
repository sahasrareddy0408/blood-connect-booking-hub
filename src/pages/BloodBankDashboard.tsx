
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const BloodBankDashboard = () => {
  // Mock upcoming appointments data
  const appointments = [
    {
      id: 1,
      donorName: "John Smith",
      bloodType: "O+",
      date: "2025-04-06",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      donorName: "Maria Garcia",
      bloodType: "B-",
      date: "2025-04-06",
      time: "11:30 AM",
      status: "Confirmed"
    },
    {
      id: 3,
      donorName: "David Wong",
      bloodType: "A+",
      date: "2025-04-07",
      time: "9:15 AM",
      status: "Confirmed"
    }
  ];

  // Mock current blood inventory
  const inventory = [
    { type: "A+", units: 12 },
    { type: "A-", units: 5 },
    { type: "B+", units: 8 },
    { type: "B-", units: 3 },
    { type: "O+", units: 15 },
    { type: "O-", units: 6 },
    { type: "AB+", units: 4 },
    { type: "AB-", units: 2 },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit blood request will be implemented with MongoDB later
    console.log("Blood request submitted");
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Blood Bank Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Post Blood Requirement</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <form onSubmit={handleRequestSubmit}>
              <DialogHeader>
                <DialogTitle>Post New Blood Requirement</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new blood requirement request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="blood-type" className="text-right">
                    Blood Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a_pos">A+</SelectItem>
                      <SelectItem value="a_neg">A-</SelectItem>
                      <SelectItem value="b_pos">B+</SelectItem>
                      <SelectItem value="b_neg">B-</SelectItem>
                      <SelectItem value="ab_pos">AB+</SelectItem>
                      <SelectItem value="ab_neg">AB-</SelectItem>
                      <SelectItem value="o_pos">O+</SelectItem>
                      <SelectItem value="o_neg">O-</SelectItem>
                      <SelectItem value="all">All Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="units" className="text-right">
                    Units Needed
                  </Label>
                  <Input
                    id="units"
                    type="number"
                    min="1"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="needed-by" className="text-right">
                    Needed By
                  </Label>
                  <Input
                    id="needed-by"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="urgency" className="text-right">
                    Urgency
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Details
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about this request"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Post Requirement</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Blood Inventory</CardTitle>
            <CardDescription>Available units by blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {inventory.map((item) => (
                <div key={item.type} className="text-center">
                  <div className="text-3xl font-bold">{item.units}</div>
                  <div className="text-xl font-semibold text-primary">{item.type}</div>
                  <div className="text-xs text-muted-foreground">units</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Inventory</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Blood Requests</CardTitle>
            <CardDescription>Currently open donation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <span className="font-medium">O+ Blood</span>
                  <p className="text-sm text-muted-foreground">10 units • Emergency</p>
                </div>
                <Badge variant="destructive">8 responses</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <span className="font-medium">AB- Blood</span>
                  <p className="text-sm text-muted-foreground">3 units • High</p>
                </div>
                <Badge variant="secondary">2 responses</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <span className="font-medium">All Blood Types</span>
                  <p className="text-sm text-muted-foreground">15 units • Normal</p>
                </div>
                <Badge variant="secondary">5 responses</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Requests</Button>
          </CardFooter>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Donor</th>
              <th className="py-2 px-4 text-left">Blood Type</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="py-3 px-4">{appointment.donorName}</td>
                <td className="py-3 px-4">{appointment.bloodType}</td>
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {appointment.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodBankDashboard;
