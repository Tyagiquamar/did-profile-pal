import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Shield, Key, Users, Globe, Sparkles, Zap, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DIDProfileHeader from "@/components/DIDProfileHeader";
import DIDCreator from "@/components/DIDCreator";
import CredentialCard from "@/components/CredentialCard";
import CredentialViewer from "@/components/CredentialViewer";
import ProfileReviews from "@/components/ProfileReviews";
import MockProfiles from "@/components/MockProfiles";
import { useToast } from "@/hooks/use-toast";

interface DIDProfile {
  did: string;
  name: string;
  bio?: string;
  email?: string;
  website?: string;
  avatar?: string;
  verified: boolean;
  publicKey: string;
  createdAt: string;
  credentials: any[];
}

const Index = () => {
  const [currentProfile, setCurrentProfile] = useState<DIDProfile | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [showCreator, setShowCreator] = useState(false);
  const { toast } = useToast();

  // Enhanced mock credentials with more variety
  const mockCredentials = [
    {
      id: '1',
      type: 'Education Certificate',
      issuer: 'MIT University',
      issuedDate: '2023-06-15',
      expiryDate: '2028-06-15',
      status: 'verified' as const,
      data: {
        degree: 'Bachelor of Computer Science',
        gpa: '3.8',
        graduationDate: '2023-06-15',
        honors: 'Magna Cum Laude',
        specialization: 'Blockchain Technology',
        thesis: 'Consensus Mechanisms in Distributed Systems'
      }
    },
    {
      id: '2',
      type: 'Professional License',
      issuer: 'State Board of Engineering',
      issuedDate: '2023-08-01',
      status: 'verified' as const,
      data: {
        licenseNumber: 'PE-2023-001',
        profession: 'Professional Engineer',
        level: 'Senior',
        specialties: ['Software Engineering', 'Blockchain Development'],
        renewalDate: '2025-08-01'
      }
    },
    {
      id: '3',
      type: 'Industry Certification',
      issuer: 'Ethereum Foundation',
      issuedDate: '2023-09-10',
      expiryDate: '2025-09-10',
      status: 'verified' as const,
      data: {
        certification: 'Certified Ethereum Developer',
        level: 'Expert',
        skills: ['Solidity', 'Smart Contracts', 'DApp Development'],
        examScore: '95%',
        certificationId: 'ETH-DEV-2023-789'
      }
    },
    {
      id: '4',
      type: 'Employment Verification',
      issuer: 'TechCorp Inc.',
      issuedDate: '2023-10-01',
      status: 'verified' as const,
      data: {
        position: 'Senior Blockchain Developer',
        department: 'Engineering',
        startDate: '2021-03-15',
        endDate: '2023-09-30',
        salary: '$120,000',
        performance: 'Exceeds Expectations'
      }
    },
    {
      id: '5',
      type: 'Security Clearance',
      issuer: 'Government Security Agency',
      issuedDate: '2023-05-20',
      expiryDate: '2028-05-20',
      status: 'pending' as const,
      data: {
        clearanceLevel: 'Secret',
        investigationType: 'Background Investigation',
        status: 'Under Review',
        applicationDate: '2023-04-01'
      }
    },
    {
      id: '6',
      type: 'Achievement Badge',
      issuer: 'Open Source Foundation',
      issuedDate: '2023-11-15',
      status: 'verified' as const,
      data: {
        achievement: 'Top Contributor 2023',
        project: 'Web3 Identity Protocol',
        contributions: '150+ commits',
        impact: 'Critical security improvements',
        recognition: 'Community Choice Award'
      }
    }
  ];

  const handleDIDCreated = (didData: any) => {
    setCurrentProfile({
      ...didData,
      credentials: mockCredentials
    });
    setShowCreator(false);
  };

  const handleViewCredential = (credential: any) => {
    setSelectedCredential(credential);
  };

  const handleDownloadCredential = (credential: any) => {
    const dataStr = JSON.stringify(credential, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credential-${credential.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Credential Downloaded",
      description: "Your verifiable credential has been saved as a JSON file",
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    });
  };

  if (showCreator) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onCreateProfile={() => setShowCreator(true)} />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setShowCreator(false)}
                className="mb-4 hover:bg-primary/20"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <DIDCreator onDIDCreated={handleDIDCreated} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onCreateProfile={() => setShowCreator(true)} />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* Hero Section */}
            <div className="space-y-6 animate-in fade-in-0 duration-1000">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-primary font-medium">Powered by Blockchain Technology</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
                DID Profile Manager
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-400">
                Create and manage your <span className="text-primary font-semibold">decentralized identity</span> with 
                verifiable credentials on the blockchain. Take control of your digital identity.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
              <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center group-hover:animate-pulse">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Secure Identity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your identity is secured by cryptographic keys and stored on decentralized networks 
                    with military-grade encryption.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:animate-pulse">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Self-Sovereign</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You own and control your data without relying on centralized authorities. 
                    True digital sovereignty.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-500 hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:animate-pulse">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Interoperable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use your DID across different platforms and services seamlessly. 
                    One identity, infinite possibilities.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Active DIDs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Credentials Issued</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-1000 delay-1000">
              <Button 
                onClick={() => setShowCreator(true)}
                className="bg-primary hover:bg-primary/80 text-lg px-12 py-6 neon-glow hover:scale-105 transition-all duration-300 group"
              >
                <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Create Your DID Profile
                <Zap className="w-5 h-5 ml-3 animate-pulse" />
              </Button>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Get started in minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>No KYC required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Fully decentralized</span>
                </div>
              </div>
            </div>

            {/* Mock Profiles Section */}
            <div className="mt-20 animate-in slide-in-from-bottom-8 duration-1000 delay-1200">
              <MockProfiles />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentProfile={currentProfile} />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="animate-in slide-in-from-top-4 duration-500">
            <DIDProfileHeader
              did={currentProfile.did}
              name={currentProfile.name}
              avatar={currentProfile.avatar}
              verified={currentProfile.verified}
              credentialsCount={currentProfile.credentials.length}
              onEditProfile={handleEditProfile}
            />
          </div>
          
          <Tabs defaultValue="credentials" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-effect">
              <TabsTrigger value="credentials" className="transition-all duration-300">
                Credentials
              </TabsTrigger>
              <TabsTrigger value="profile" className="transition-all duration-300">
                Profile Data
              </TabsTrigger>
              <TabsTrigger value="reviews" className="transition-all duration-300">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="settings" className="transition-all duration-300">
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="credentials" className="space-y-6 animate-in fade-in-0 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gradient">Verifiable Credentials</h2>
                <Button className="bg-primary hover:bg-primary/80 hover:scale-105 transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credential
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProfile.credentials.map((credential, index) => (
                  <div 
                    key={credential.id}
                    className="animate-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CredentialCard
                      credential={credential}
                      onView={handleViewCredential}
                      onDownload={handleDownloadCredential}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6 animate-in fade-in-0 duration-500">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="text-gradient">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">DID</label>
                      <p className="font-mono text-sm bg-muted/50 p-2 rounded break-all">{currentProfile.did}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p>{currentProfile.name}</p>
                    </div>
                    {currentProfile.email && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p>{currentProfile.email}</p>
                      </div>
                    )}
                    {currentProfile.website && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Website</label>
                        <p>{currentProfile.website}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created</label>
                      <p>{new Date(currentProfile.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                  </div>
                  {currentProfile.bio && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Bio</label>
                      <p className="text-muted-foreground">{currentProfile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="animate-in fade-in-0 duration-500">
              <ProfileReviews profileDid={currentProfile.did} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 animate-in fade-in-0 duration-500">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="text-gradient">DID Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 hover:bg-muted/20 rounded-lg px-2 transition-colors">
                    <div>
                      <h3 className="font-medium">Export DID Document</h3>
                      <p className="text-sm text-muted-foreground">Download your complete DID document</p>
                    </div>
                    <Button variant="outline" className="hover:scale-105 transition-transform">Export</Button>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-muted/20 rounded-lg px-2 transition-colors">
                    <div>
                      <h3 className="font-medium">Backup Keys</h3>
                      <p className="text-sm text-muted-foreground">Securely backup your cryptographic keys</p>
                    </div>
                    <Button variant="outline" className="hover:scale-105 transition-transform">Backup</Button>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-muted/20 rounded-lg px-2 transition-colors">
                    <div>
                      <h3 className="font-medium">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage who can view your profile and credentials</p>
                    </div>
                    <Button variant="outline" className="hover:scale-105 transition-transform">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-muted/20 rounded-lg px-2 transition-colors">
                    <div>
                      <h3 className="font-medium text-red-400">Revoke DID</h3>
                      <p className="text-sm text-muted-foreground">Permanently revoke this decentralized identity</p>
                    </div>
                    <Button variant="destructive" className="hover:scale-105 transition-transform">Revoke</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {selectedCredential && (
            <CredentialViewer
              credential={selectedCredential}
              onClose={() => setSelectedCredential(null)}
              onDownload={handleDownloadCredential}
            />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;