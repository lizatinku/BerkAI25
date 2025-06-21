
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, Mail, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="security-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold">PhishFilter</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/login')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-blue-100 text-sm">
          Stay protected from scams and phishing attacks
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">247</div>
              <div className="text-sm text-green-700">Scams Blocked</div>
            </div>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-blue-700">Accuracy Rate</div>
            </div>
          </Card>
        </div>

        {/* Main Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Protection Tools</h2>
          
          <Card 
            className="security-card cursor-pointer"
            onClick={() => navigate('/scam-call')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Detect Scam Call</h3>
                <p className="text-sm text-slate-600">
                  Real-time call analysis and scam detection
                </p>
              </div>
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          </Card>

          <Card 
            className="security-card cursor-pointer"
            onClick={() => navigate('/email-detection')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Detect Phishing Email</h3>
                <p className="text-sm text-slate-600">
                  Analyze emails for phishing attempts and threats
                </p>
              </div>
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Widget */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-slate-800">Control Center Widget</h3>
            <p className="text-sm text-slate-600">
              Add PhishFilter to your Control Center for instant call protection
            </p>
            <Button 
              className="security-button w-full"
              onClick={() => navigate('/scam-call-widget')}
            >
              View Widget
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-800">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Scam Detected</div>
                  <div className="text-xs text-slate-500">2 minutes ago</div>
                </div>
              </div>
              <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                IRS Scam
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Email Safe</div>
                  <div className="text-xs text-slate-500">1 hour ago</div>
                </div>
              </div>
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
