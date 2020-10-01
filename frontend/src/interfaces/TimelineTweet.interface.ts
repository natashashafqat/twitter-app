export interface TimelineTweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: {
    hashtags: unknown[];
    symbols: unknown[];
    user_mentions: [
      {
        screen_name: string;
        name: string;
        id: number;
        id_str: string;
        indices: number[];
      }
    ];
    urls: unknown[];
  };
  source: string;
  in_reply_to_status_id: number;
  in_reply_to_status_id_str: string;
  in_reply_to_user_id: number;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  user: {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    entities: {
      url: {
        urls: [
          {
            url: string;
            expanded_url: string;
            display_url: string;
            indices: number[];
          }
        ]
      };
      description: {
        urls: unknown[];
      };
    };
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset: unknown;
    time_zone: unknown;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang: unknown;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: string;
    profile_background_image_url_https: string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_banner_url: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following: unknown;
    follow_request_sent: unknown;
    notifications: unknown;
    translator_type: string;
  };
  geo: unknown;
  coordinates: unknown;
  place: unknown;
  contributors: unknown;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
}