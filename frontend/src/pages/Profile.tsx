import React from 'react';
import {
  User,
  Mail,
  Edit3,
  LogOut,
  Shield,
  Activity,
  Settings,
  Calendar,
  Zap,
} from 'lucide-react';

interface ProfilePageProps {
  onEditProfile: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onEditProfile, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
                <p className="text-gray-400">Your account overview & preferences</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onEditProfile}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-8">
        {/* Left: Profile Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            U
          </div>
          <h2 className="text-2xl font-bold text-white">Your Name</h2>
          <p className="text-gray-400">AI Enthusiast • Builder</p>

          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4">
              <User className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-gray-400 text-xs">Username</p>
                <p className="text-white font-medium">@username</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4">
              <Mail className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-gray-400 text-xs">Email</p>
                <p className="text-white font-medium">user@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-gray-400 text-xs">Joined</p>
                <p className="text-white font-medium">Jan 2026</p>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-red-500/40 transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Middle: Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">Agents Created</p>
              </div>
              <p className="text-3xl font-bold text-white mt-3">12</p>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">Executions</p>
              </div>
              <p className="text-3xl font-bold text-white mt-3">148</p>
            </div>
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">Account Status</p>
              </div>
              <p className="text-3xl font-bold text-emerald-400 mt-3">Secure</p>
            </div>
          </div>

          {/* Settings & Security */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              Settings & Security
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
                <div>
                  <p className="text-white font-medium">Two-factor authentication</p>
                  <p className="text-gray-400 text-sm">Add extra account security</p>
                </div>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
                <div>
                  <p className="text-white font-medium">Email notifications</p>
                  <p className="text-gray-400 text-sm">Execution & security alerts</p>
                </div>
                <span className="text-purple-400 font-semibold">On</span>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
                <div>
                  <p className="text-white font-medium">Connected devices</p>
                  <p className="text-gray-400 text-sm">2 active sessions</p>
                </div>
                <button className="text-sm text-purple-400 hover:underline">Manage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;