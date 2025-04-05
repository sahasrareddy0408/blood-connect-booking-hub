
import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-blood mb-4">
                <Droplet className="h-5 w-5 fill-blood" />
                <span className="text-lg font-medium">Life Share</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-blood">Donate Blood,</span><br />
                <span className="text-blood-navy">Save a Life Today</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Your blood donation can save up to three lives. Join our community 
                of donors and make a difference today. Every drop counts!
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/donate">
                  <Button className="bg-blood hover:bg-blood-dark text-white px-8 py-6 rounded-md">
                    Donate Now
                  </Button>
                </Link>
                <Link to="/request">
                  <Button variant="outline" className="border-blood text-blood hover:bg-blood/10 px-8 py-6 rounded-md">
                    Request Blood
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center">
                <div className="bg-white rounded-full p-1 shadow-md">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                    ))}
                  </div>
                </div>
                <p className="ml-4 text-gray-600">
                  <span className="font-medium text-blood-navy">Joined by 10,000+</span> donors worldwide
                </p>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-72 h-72 bg-blood/10 rounded-full" />
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/b75202f9-7658-4d4a-8510-4bed6008b565.png" 
                  alt="Blood Donation" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-blood/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <Droplet className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-3xl font-bold text-blood-navy">30,000+</h3>
              <p className="text-gray-600">Blood donations collected</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-3xl font-bold text-blood-navy">15,000+</h3>
              <p className="text-gray-600">Lives saved through donations</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-3xl font-bold text-blood-navy">500+</h3>
              <p className="text-gray-600">Donation drives organized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-blood-navy mb-4">Why Donate Blood?</h2>
            <p className="text-gray-600">
              Blood donation is a critical lifeline for many people. Your contribution can help save lives in emergency situations, 
              surgeries, and for patients with various medical conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blood/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blood" />
                </div>
                <h3 className="text-xl font-semibold text-blood-navy mb-3">Save Lives</h3>
                <p className="text-gray-600">
                  One blood donation can save up to three lives. Your contribution directly helps patients in need.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blood/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blood" />
                </div>
                <h3 className="text-xl font-semibold text-blood-navy mb-3">Regular Need</h3>
                <p className="text-gray-600">
                  Every two seconds, someone needs blood. Regular donations ensure hospitals have sufficient supply.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blood/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blood" />
                </div>
                <h3 className="text-xl font-semibold text-blood-navy mb-3">Community Support</h3>
                <p className="text-gray-600">
                  By donating blood, you join a community of donors committed to helping others in times of need.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/about">
              <Button variant="link" className="text-blood hover:text-blood-dark inline-flex items-center gap-2">
                Learn more about blood donation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blood">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of donors who have already saved lives through blood donation. 
              Book your appointment today and be part of this life-saving community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate">
                <Button className="bg-white text-blood hover:bg-gray-100 px-8 py-6 rounded-md">
                  Schedule Donation
                </Button>
              </Link>
              <Link to="/request">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-md">
                  Request Blood
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
