import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Star,
  Users,
  Eye,
  MessageCircle
} from "lucide-react";

interface MockProfile {
  id: string;
  name: string;
  did: string;
  avatar?: string;
  title: string;
  location: string;
  bio: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  credentialCount: number;
  skills: string[];
  lastActive: string;
  category: string;
}

const MockProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const mockProfiles: MockProfile[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      did: 'did:ethr:0x1234567890abcdef',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Blockchain Research Scientist',
      location: 'San Francisco, CA',
      bio: 'PhD in Computer Science from Stanford. Specializing in consensus algorithms and DeFi protocols. Published 15+ papers on blockchain technology.',
      verified: true,
      rating: 4.9,
      reviewCount: 23,
      credentialCount: 8,
      skills: ['Solidity', 'Cryptography', 'Research', 'DeFi'],
      lastActive: '2 hours ago',
      category: 'Academic'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      did: 'did:ethr:0x2345678901bcdef0',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Senior Smart Contract Developer',
      location: 'Austin, TX',
      bio: 'Full-stack blockchain developer with 5+ years experience. Built DApps handling $100M+ in TVL. Expert in Ethereum and Layer 2 solutions.',
      verified: true,
      rating: 4.8,
      reviewCount: 31,
      credentialCount: 12,
      skills: ['Solidity', 'React', 'Node.js', 'Web3'],
      lastActive: '1 day ago',
      category: 'Developer'
    },
    {
      id: '3',
      name: 'Emily Watson',
      did: 'did:ethr:0x3456789012cdef01',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Crypto Legal Advisor',
      location: 'New York, NY',
      bio: 'JD from Harvard Law. Specialized in cryptocurrency regulations and compliance. Advised 50+ blockchain startups on legal matters.',
      verified: true,
      rating: 4.7,
      reviewCount: 18,
      credentialCount: 6,
      skills: ['Legal', 'Compliance', 'Regulations', 'Consulting'],
      lastActive: '3 hours ago',
      category: 'Legal'
    },
    {
      id: '4',
      name: 'Alex Kim',
      did: 'did:ethr:0x4567890123def012',
      title: 'DeFi Product Manager',
      location: 'London, UK',
      bio: 'MBA from Wharton. Led product development for major DeFi protocols. Expert in tokenomics and protocol design.',
      verified: false,
      rating: 4.6,
      reviewCount: 14,
      credentialCount: 5,
      skills: ['Product Management', 'DeFi', 'Tokenomics', 'Strategy'],
      lastActive: '1 week ago',
      category: 'Business'
    },
    {
      id: '5',
      name: 'Dr. Raj Patel',
      did: 'did:ethr:0x5678901234ef0123',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Cryptography Professor',
      location: 'Boston, MA',
      bio: 'Professor at MIT. 20+ years in cryptography research. Contributed to several blockchain security protocols and zero-knowledge proof systems.',
      verified: true,
      rating: 5.0,
      reviewCount: 8,
      credentialCount: 15,
      skills: ['Cryptography', 'ZK-Proofs', 'Security', 'Teaching'],
      lastActive: '5 hours ago',
      category: 'Academic'
    },
    {
      id: '6',
      name: 'Lisa Thompson',
      did: 'did:ethr:0x6789012345f01234',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Blockchain UX Designer',
      location: 'Seattle, WA',
      bio: 'Design lead for Web3 applications. Focused on making blockchain technology accessible to mainstream users. 10+ years in UX design.',
      verified: true,
      rating: 4.8,
      reviewCount: 22,
      credentialCount: 7,
      skills: ['UX Design', 'Web3', 'Figma', 'User Research'],
      lastActive: '6 hours ago',
      category: 'Design'
    }
  ];

  const categories = ['All', 'Academic', 'Developer', 'Legal', 'Business', 'Design'];

  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || profile.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-gradient">Discover DID Profiles</CardTitle>
          <p className="text-muted-foreground">
            Explore verified professionals and their credentials in the decentralized identity ecosystem
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, title, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/80" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile, index) => (
          <Card 
            key={profile.id} 
            className="glass-effect border-primary/20 hover:neon-glow transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-primary/20 text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold truncate">{profile.name}</h3>
                    {profile.verified && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{profile.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {profile.location}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {profile.bio}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(profile.rating)}
                  <span className="text-sm font-medium ml-1">{profile.rating}</span>
                  <span className="text-xs text-muted-foreground">({profile.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {profile.credentialCount}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {profile.reviewCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {profile.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{profile.skills.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Active {profile.lastActive}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <Card className="glass-effect border-primary/20">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No profiles found</h3>
              <p>Try adjusting your search terms or category filter</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MockProfiles;