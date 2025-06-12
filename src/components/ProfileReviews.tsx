import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Flag,
  Plus,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  reviewer: {
    name: string;
    did: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  category: string;
  verified: boolean;
}

interface ProfileReviewsProps {
  profileDid: string;
}

const ProfileReviews = ({ profileDid }: ProfileReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      reviewer: {
        name: 'Alice Johnson',
        did: 'did:ethr:0x1234...5678',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: true
      },
      rating: 5,
      title: 'Excellent Professional Credentials',
      content: 'Worked with this person on multiple blockchain projects. Their credentials are authentic and they demonstrate exceptional technical skills. Highly recommended for any DeFi or smart contract development work.',
      date: '2024-01-15',
      helpful: 12,
      category: 'Professional',
      verified: true
    },
    {
      id: '2',
      reviewer: {
        name: 'Bob Smith',
        did: 'did:ethr:0x9876...4321',
        verified: true
      },
      rating: 4,
      title: 'Reliable and Trustworthy',
      content: 'Had a great experience collaborating on a DAO governance project. Communication was clear and deliverables were on time. The educational credentials check out perfectly.',
      date: '2024-01-10',
      helpful: 8,
      category: 'Collaboration',
      verified: true
    },
    {
      id: '3',
      reviewer: {
        name: 'Carol Davis',
        did: 'did:ethr:0x5555...7777',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: false
      },
      rating: 5,
      title: 'Outstanding Academic Background',
      content: 'Verified their MIT credentials through the blockchain registry. Impressive academic achievements and the person is very knowledgeable in cryptography and distributed systems.',
      date: '2024-01-05',
      helpful: 15,
      category: 'Academic',
      verified: false
    }
  ]);

  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    category: 'Professional'
  });
  const { toast } = useToast();

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleAddReview = () => {
    if (!newReview.title || !newReview.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      reviewer: {
        name: 'You',
        did: 'did:ethr:0x1111...2222',
        verified: true
      },
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      category: newReview.category,
      verified: true
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', content: '', category: 'Professional' });
    setShowAddReview(false);

    toast({
      title: "Review Added",
      description: "Your review has been published on the blockchain",
    });
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gradient">Profile Reviews</CardTitle>
            <Button 
              onClick={() => setShowAddReview(!showAddReview)}
              className="bg-primary hover:bg-primary/80"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating), "w-5 h-5")}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviews.length} reviews
              </p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Verified Reviews</span>
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  {reviews.filter(r => r.verified).length}/{reviews.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Rate</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-sm font-medium">2 hours</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Review Form */}
      {showAddReview && (
        <Card className="glass-effect border-primary/20 animate-in slide-in-from-top-4 duration-300">
          <CardHeader>
            <CardTitle>Add Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < newReview.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-muted-foreground hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select 
                value={newReview.category}
                onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                <option value="Professional">Professional</option>
                <option value="Academic">Academic</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Technical">Technical</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Brief summary of your experience"
                className="w-full p-2 rounded-md border border-input bg-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Review</label>
              <Textarea
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                placeholder="Share your detailed experience..."
                rows={4}
                className="bg-background/50"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddReview} className="bg-primary hover:bg-primary/80">
                Publish Review
              </Button>
              <Button variant="outline" onClick={() => setShowAddReview(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <Card 
            key={review.id} 
            className="glass-effect border-primary/20 hover:neon-glow transition-all duration-300 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.reviewer.avatar} />
                  <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{review.reviewer.name}</h4>
                        {review.reviewer.verified && (
                          <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {review.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {review.reviewer.did}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">{review.title}</h5>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileReviews;