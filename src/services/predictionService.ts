import { RandomForestClassifier, RandomForestRegression } from 'ml-random-forest';

/**
 * Prediction Service for WheelRank
 * Uses Random Forest to predict Wheel Score based on driving metrics.
 */

export interface DrivingMetrics {
  braking: number;      // 0-100
  acceleration: number; // 0-100
  corners: number;      // 0-100
  overspeedAlerts: number; // 0-10
  avgGForce: number;    // 0-5
}

class PredictionService {
  private model: RandomForestRegression | null = null;

  constructor() {
    this.trainModel();
  }

  /**
   * Trains a simple Random Forest model with synthetic data
   * In a real app, this would be trained on historical driver data.
   */
  private trainModel() {
    const trainingData: number[][] = [];
    const targets: number[] = [];

    // Generate synthetic training data
    // High scores for good driving
    for (let i = 0; i < 50; i++) {
      const braking = 80 + Math.random() * 20;
      const acceleration = 80 + Math.random() * 20;
      const corners = 80 + Math.random() * 20;
      const alerts = Math.floor(Math.random() * 2);
      const gForce = 0.5 + Math.random() * 1.5;
      
      trainingData.push([braking, acceleration, corners, alerts, gForce]);
      // Score calculation logic for training
      const score = (braking * 0.3 + acceleration * 0.3 + corners * 0.3) - (alerts * 5) - (gForce * 2);
      targets.push(Math.min(100, Math.max(0, score)));
    }

    // Low scores for poor driving
    for (let i = 0; i < 50; i++) {
      const braking = 40 + Math.random() * 40;
      const acceleration = 40 + Math.random() * 40;
      const corners = 40 + Math.random() * 40;
      const alerts = 3 + Math.floor(Math.random() * 7);
      const gForce = 2.5 + Math.random() * 2.5;
      
      trainingData.push([braking, acceleration, corners, alerts, gForce]);
      const score = (braking * 0.3 + acceleration * 0.3 + corners * 0.3) - (alerts * 5) - (gForce * 2);
      targets.push(Math.min(100, Math.max(0, score)));
    }

    const options = {
      seed: 42,
      maxFeatures: 0.8,
      replacement: true,
      nEstimators: 50,
    };

    this.model = new RandomForestRegression(options);
    this.model.train(trainingData, targets);
  }

  /**
   * Predicts the Wheel Score for a given set of metrics
   */
  public predictWheelScore(metrics: DrivingMetrics): number {
    if (!this.model) return 0;
    
    const input = [
      metrics.braking,
      metrics.acceleration,
      metrics.corners,
      metrics.overspeedAlerts,
      metrics.avgGForce
    ];

    const prediction = this.model.predict([input])[0];
    return Math.round(prediction);
  }

  /**
   * Generates random metrics for simulation
   */
  public generateRandomMetrics(): DrivingMetrics {
    return {
      braking: 70 + Math.random() * 30,
      acceleration: 70 + Math.random() * 30,
      corners: 70 + Math.random() * 30,
      overspeedAlerts: Math.floor(Math.random() * 3),
      avgGForce: 0.5 + Math.random() * 2
    };
  }
}

export const predictionService = new PredictionService();
